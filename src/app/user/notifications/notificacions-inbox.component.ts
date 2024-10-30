import { Component, OnInit } from "@angular/core";
import { NotificationService } from "./notification.service";

@Component({
    selector: "notifications-inbox",
    templateUrl: "notifications-inbox.component.html",
    styleUrls: ["notifications-inbox.component.css"]
})
export class NotificationsInboxComponent implements OnInit {

    notifications: any[] = [];

    pageNum: number = 0;
    pageSize: number = 5;
    totalNotifications: number = 0;
  
    constructor(private notificationService: NotificationService) {}
  
    ngOnInit(): void {
      this.loadNotifications(); // Cargar las notificaciones al iniciar
    }
  
    loadNotifications(): void {
        this.notificationService.getInbox(this.pageNum, this.pageSize).subscribe(res => {
            this.notifications = [...this.notifications, ...res.content];
        });
      
  
      // Simulación de paginación
      this.totalNotifications = 13;
    }
  
    markAsRead(notification: any): void {
      notification.read = true; // Marcar como leído
    }
  
    deleteNotification(notification: any): void {
      this.notifications = this.notifications.filter(n => n.id !== notification.id); 
    }
  
    loadMore(): void {
      if ((this.pageNum + 1) * this.pageSize < this.totalNotifications) {
        this.pageNum++;
        this.loadNotifications();
      }
    }

    getIconForType(type: string): string {
        switch (type) {
          case 'FOLLOWING':
            return 'person_add'; // Icono para seguir
          case 'COMMENT':
            return 'comment'; // Icono para comentarios
          case 'RESPONSE':
            return 'reply'; // Icono para respuestas
          case 'LIKE_MEME':
            return 'thumb_up'; // Icono para gustar un meme
          case 'LIKE_COMMENT':
            return 'thumb_up'; // Icono para gustar un comentario
          case 'MESSAGE':
            return 'message'; // Icono para mensajes
          case 'SYSTEM':
            return 'settings'; // Icono para sistema
          case 'REPORT':
            return 'report'; // Icono para reportes
          case 'IMPROVEMENT_SUGGESTION':
            return 'star'; // Icono para sugerencias de mejora
          case 'OTHER':
            return 'info'; // Icono para otros
          default:
            return 'notifications'; // Icono por defecto
        }
      }
}