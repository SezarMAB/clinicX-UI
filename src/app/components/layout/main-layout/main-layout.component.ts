import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatBadgeModule
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  sidebarItems = [
    { icon: 'comment_bank', route: '/messages', badge: 3, tooltip: 'الرسائل' },
    { icon: 'calendar_today', route: '/appointments', tooltip: 'المواعيد' },
    { icon: 'settings', route: '/settings', tooltip: 'الإعدادات' }
  ];
}