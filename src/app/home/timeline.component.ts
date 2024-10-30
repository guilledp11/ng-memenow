import { Component, HostListener, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MemeService } from "../user/meme.service";

@Component({
    selector: "timeline",
    templateUrl: "timeline.component.html"
})
export class TimelineComponent implements OnInit{

    memesIds: number[] = [];
    pageNum: number = 0;
    pageSize: number = 5;
    initMoment: Date = new Date();
    isLoading: boolean = false; 
    noMoreDataToLoad: boolean = false;

    constructor(private memeService: MemeService) {}

    ngOnInit() {
        this.loadMemes();
    }

    loadMemes() {
        if (this.isLoading) return;
        else if(this.noMoreDataToLoad) {
            this.isLoading = false;
            return;
        }
        this.isLoading = true;
        
        this.memeService.timeline(this.pageNum++, this.pageSize, this.initMoment).subscribe(res => {
            if(res.content.length > 0) {
                this.memesIds = [...this.memesIds, ...res.content];
            } else {
                this.noMoreDataToLoad = true;
            }
            this.isLoading = false;
            
        });
    }

    @HostListener("window:scroll", [])
    onScroll(): void {
        const threshold = 100; // 100 píxeles antes de llegar al final
        const position = window.innerHeight + window.scrollY;
        const height = document.documentElement.scrollHeight;

        if (position >= height - threshold && !this.isLoading) {
            this.loadMemes();
        }
    }

}