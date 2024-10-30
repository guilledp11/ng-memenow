import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'keyword-input',
  templateUrl: './keyword.input.component.html',
  styleUrls: ['./keyword.input.component.css']
})
export class KeywordInputComponent {
  keywords: string[] = []; 
  newKeyword: string = '';

  @Output() keywordsChange = new EventEmitter<string[]>();

  addKeyword(event: KeyboardEvent | MouseEvent | Event): void {
    if(event != null && event instanceof KeyboardEvent) {
      event.preventDefault();
    }
    let trimmedKeyword = this.newKeyword.trim();
    if (trimmedKeyword) {
      this.keywords.push(trimmedKeyword); 
      this.newKeyword = ''; 
      this.keywordsChange.emit(this.keywords);
    }
  }

  removeKeyword(keyword: string): void {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);
      this.keywordsChange.emit(this.keywords);
    }
  }
}
