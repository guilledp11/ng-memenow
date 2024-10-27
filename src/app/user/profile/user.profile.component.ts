
// user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user.profile.component.html',
    styleUrls: ['./user.profile.component.css']
})
export class UserProfileComponent implements OnInit {
    user: any;
    stats: any;
    posts: any[] = [];
    avatarUrl: SafeUrl | undefined;

    pageSize: number = 9;
    pageNum: number = 0;
    totalPosts: number | undefined;
    loadedPosts: number = 0;

    constructor(private userService: UserService, private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
        this.userService.findLoggedUser().subscribe(u => {
            this.user = u;
            this.stats = u.followingStats;
            this.totalPosts = u.followingStats.numPublications;
            this.loadPosts();
        });

        this.userService.findLoggedUserImage().subscribe(blob => {
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
        if(this.totalPosts !== undefined && this.loadedPosts < this.totalPosts) {
            this.pageNum++;
            this.loadPosts();
        }
    }
}
