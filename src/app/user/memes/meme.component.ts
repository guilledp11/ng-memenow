import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../comment.service';
import { MemeService } from '../meme.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'meme',
    templateUrl: './meme.component.html',
    styleUrls: ['./meme.component.css']
})
export class MemeComponent implements OnInit {

    @Input() memeId!: number;
    userProfilePicUrl: SafeUrl | undefined;
    meme: any;
    mediaUrl: SafeUrl | undefined;
    conditionLike: boolean = false;
    conditionSaved: boolean = false;

    commentsVisible: boolean = false;
    comments: any[] = [];
    newComment: string = '';


    constructor(private route: ActivatedRoute, private commentService: CommentService, private memeService: MemeService, private sanitizer: DomSanitizer) {

    }

    ngOnInit(): void {
        if (!this.memeId) {
            this.route.params.subscribe(params => {
                this.memeId = params['id'];
            });
        }

        this.loadMeme();
    }

    loadMeme() : void {
        this.memeService.findMemeDataById(this.memeId).subscribe(meme => {
            this.meme = meme;
            this.loadUserProfilePic(meme.user, true);
        });

        this.memeService.findMediaByMemeId(this.memeId).subscribe(blob => {
            const objectURL = URL.createObjectURL(blob);
            this.mediaUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
    }

    loadUserProfilePic(user: any, isHeader: boolean) : void {
        console.log("perparte");
        console.log(user);
        this.memeService.findMediaById(user.profilePicId).subscribe(blob => {
            let url: SafeUrl =  this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
            if(isHeader) {
                this.userProfilePicUrl = url
            }
            
            user.profilePicUrl = url;
        });
    }


    toggleComments(): void {
        this.commentsVisible = !this.commentsVisible;
        if(this.commentsVisible) {
            this.loadComments();
        }
        
    }

    loadComments(): void {
        this.commentService.getComments(this.memeId).subscribe(data => {
            this.comments = data; // Asigna los comentarios recibidos
        });
    }

    postComment(): void {
        if (this.newComment.trim()) {
            this.commentService.addComment(this.memeId, null, this.newComment).subscribe((comment:any) => {
                this.comments.push(comment);
                this.newComment = '';
            });
        }
    }
}
