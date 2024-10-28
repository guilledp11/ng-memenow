
// user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

type UserFunction = () => Observable<any>;

@Component({
    selector: 'app-user-profile',
    templateUrl: './user.profile.component.html',
    styleUrls: ['./user.profile.component.css']
})
export class UserProfileComponent implements OnInit {

    

    username: string | undefined;
    user: any;
    stats: any;
    posts: any[] = [];
    avatarUrl: SafeUrl | undefined;

    pageSize: number = 9;
    pageNum: number = 0;
    totalPosts: number | undefined;
    loadedPosts: number = 0;

    following: boolean = false; // Estado inicial
    hovering: boolean = false; // Estado para verificar si el ratón está sobre el botón

    constructor(private userService: UserService, private sanitizer: DomSanitizer, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.username = params['username'];
            if (this.username == undefined) {
                this.loadData(() => this.userService.findLoggedUser(), () => this.userService.findLoggedUserImage());
            } else {
                this.loadData(() => this.userService.findUserByUsername(this.username as string), () => this.userService.findUserProfilePicByUsername(this.username as string));
            }
        });
    }

    toggleFollow() {
        this.following = !this.following; // Cambiar el estado
      }
    
      onMouseEnter() {
        this.hovering = true; // Cambiar estado de hover
      }
    
      onMouseLeave() {
        this.hovering = false; // Cambiar estado de hover
      }

    resetPage(): void {
        this.totalPosts = undefined;
        this.loadedPosts = 0;
        this.posts= [];
        this.stats = null;
        this.user = null;
    }

    loadData(fLoadUser: UserFunction, fLoadProfilePic: UserFunction): void {
        this.resetPage();
        fLoadUser().subscribe(u => {
            this.user = u;
            this.stats = u.followingStats;
            this.totalPosts = u.followingStats.numPublications;
            this.loadPosts();
        });

        fLoadProfilePic().subscribe(blob => {
            const objectURL = URL.createObjectURL(blob);
            this.avatarUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
    }

    loadPosts(): void {
        this.userService.findUserPosts(this.pageNum, this.pageSize, this.user.id).subscribe(posts => {
            this.loadedPosts += posts.content.length;
            posts.content.forEach((post: any) => {
                this.posts.push(post);
                this.loadPostImage(post);
            });
        });
    }

    loadPostImage(post: any): void {
        this.userService.findMediaByMemeId(post.id).subscribe(memeImg => {
            const objectURL = URL.createObjectURL(memeImg);
            post.mediaUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
    }

    loadMorePosts(): void {
        if (this.totalPosts !== undefined && this.loadedPosts < this.totalPosts) {
            this.pageNum++;
            this.loadPosts();
        }
    }
}
