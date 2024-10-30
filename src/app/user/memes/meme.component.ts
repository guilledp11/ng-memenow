import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../comment.service';
import { MemeService } from '../meme.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'meme',
    templateUrl: './meme.component.html',
    styleUrls: ['./meme.component.css']
})
export class MemeComponent implements OnInit {

    @Input() memeId!: number;
    userProfilePicUrl: SafeUrl | undefined;
    meme: any = {};
    mediaUrl: SafeUrl | undefined;
    mediaBlob: Blob | undefined;
    conditionLike: boolean = false;
    conditionSaved: boolean = false;

    commentsVisible: boolean = false;
    comments: any[] = [];
    focusedComment: any = null;
    newComment: string = '';
    urlMap: Map<string, SafeUrl> = new Map<string, SafeUrl>();

    viewCategories: boolean = false;
    viewKeywords: boolean = false;


    constructor(private route: ActivatedRoute, private commentService: CommentService, private memeService: MemeService,
        private userService: UserService, private sanitizer: DomSanitizer, private snackBar: MatSnackBar, private router: Router) {

    }

    ngOnInit(): void {
        if (!this.memeId) {
            this.route.params.subscribe(params => {
                this.memeId = params['id'];
            });
        }

        this.loadMeme();
    }

    loadMeme(): void {
        this.memeService.findMemeDataById(this.memeId).subscribe(meme => {
            this.meme = meme;
            this.loadUserProfilePic(meme.user, true);
        });

        this.memeService.findMediaByMemeId(this.memeId).subscribe(blob => {
            this.mediaBlob = blob;
            const objectURL = URL.createObjectURL(blob);
            this.mediaUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
    }

    loadUserProfilePic(user: any, isHeader: boolean): void {
        this.memeService.findMediaById(user.profilePicId).subscribe(blob => {
            let url: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
            if (isHeader) {
                this.userProfilePicUrl = url
            }

            user.profilePicUrl = url;
        });
    }

    toggleLike(): void {
        this.memeService.toggleLikeMeme(this.meme.id).subscribe(liked => {
            this.meme.liked = liked;
            this.meme.numLikes = this.meme.numLikes + (liked ? 1 : -1);
        });
    }


    toggleComments(): void {
        this.commentsVisible = !this.commentsVisible;
        if (this.commentsVisible) {
            this.loadComments();
        }

    }

    loadComments(): void {
        this.commentService.getComments(this.memeId).subscribe(data => {
            this.comments = data; // Asigna los comentarios recibidos
        });
    }

    toggleLikeComment(comment: any) {
        this.commentService.toggleLikeComment(comment.id).subscribe(liked => {
            comment.liked = liked;
            comment.numLikes = comment.numLikes + (liked ? 1 : -1);
        })
    }

    deleteComment(comment: any) {
        this.commentService.deleteComment(comment.id).subscribe(res => {
            this.comments = this.comments.filter(c => c !== comment);
            this.meme.numComments--;
            this.snackBar.open('Comment has been deleted succesfully', 'Close', {
                duration: 5000,
                panelClass: 'error-snackbar'
            });
        });
    }

    postComment(): void {
        if (this.newComment.trim()) {
            this.commentService.addComment(this.memeId, null, this.newComment).subscribe((comment: any) => {
                this.comments.push(comment);
                this.newComment = '';
                this.snackBar.open('Comment has been posted succesfully', 'Close', {
                    duration: 5000,
                    panelClass: 'error-snackbar'
                });
            });
        }
    }

    getURLForProfilePic(username: string): SafeUrl | undefined {
        if (!this.urlMap.has(username)) {
            this.userService.findUserProfilePicByUsername(username).subscribe(blob => {
                this.urlMap.set(username, this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob)));
            });
        }

        return this.urlMap.get(username);
    }

    download() {
        if (this.mediaBlob) {
            const downloadUrl = URL.createObjectURL(this.mediaBlob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = 'image.jpg'; // Nombre del archivo a descargar
            link.click();

            // Limpiar la URL del objeto después de la descarga para liberar memoria
            URL.revokeObjectURL(downloadUrl);
        }
    }

    deleteMeme() {
        this.memeService.delete(this.memeId).subscribe(res => {
            this.router.navigateByUrl("/user/profile");
        });
    }
}
