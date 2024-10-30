// user-selector.component.ts
import { Component, OnInit, HostListener, EventEmitter, Output, Input } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
    selector: 'multiple-selector',
    templateUrl: './multiple.selector.component.html',
    styleUrls: ['./multiple.selector.component.css'],
})
export class MultipleSelectorComponent implements OnInit {

    @Input() color: string = '#1976d2';

    @Input() selectedItems: any[] = [];
    @Input() editing: boolean = false;

    @Input() displayProperty: string = ''; 
    @Input() searchFunc!: (page: number, pageSize: number, searchQuery: string, selectedItems: any[]) => Observable<any>;

    @Output() selectedItemsChange = new EventEmitter<any[]>(); 

    items: any[] = [];
    searchQuery: string = '';
    page: number = 0;
    pageSize: number = 5;
    loading: boolean = false;
    hasMoreItems = true;

    ngOnInit() {
        this.loadItems();
    }

    loadItems() {
        if (this.loading) return; 
        this.loading = true;
        this.searchFunc(this.page, this.pageSize, this.searchQuery, this.selectedItems).subscribe((res: any) => {
            this.items = [...this.items, ...res.content]; 
            this.loading = false;
            this.page++; 
            // usar hasMoreItems para cambiar eso
        });
    }

    loadMoreItems() {
        if (!this.loading && this.hasMoreItems) {
          this.loadItems();
        }
      }

    onSearch() {
        this.page = 0; 
        this.items = []; 
        this.loadItems(); 
    }

    toggleItemSelection(item: any) {
        const index = this.selectedItems.indexOf(item);
        if (index === -1) {
            this.selectedItems.push(item);
            this.items = this.items.filter(u => u.id !== item.id);
        } else {
            this.selectedItems.splice(index, 1);
        }
        this.selectedItemsChange.emit(this.selectedItems);
    }

    removeItem(item: any) {
        const index = this.selectedItems.indexOf(item);
        if (index !== -1) {
            this.selectedItems.splice(index, 1); 
        }
        this.selectedItemsChange.emit(this.selectedItems);
    }
}
