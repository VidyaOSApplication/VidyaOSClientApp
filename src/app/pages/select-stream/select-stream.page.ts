import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-select-stream',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './select-stream.page.html',
  styleUrls: ['./select-stream.page.scss']
})
export class SelectStreamPage implements OnInit {

  examId!: number;
  classId!: number;

  streams = [
    { code: 'PCM', name: 'Science (PCM)' },
    { code: 'PCB', name: 'Science (PCB)' },
    { code: 'COMMERCE', name: 'Commerce' },
    { code: 'ARTS', name: 'Arts' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.examId = Number(this.route.snapshot.paramMap.get('examId'));
    this.classId = Number(this.route.snapshot.paramMap.get('classId'));
  }

  selectStream(streamCode: string) {
    this.router.navigate([
      '/admin/assign-subjects',
      this.examId,
      this.classId
    ], {
      queryParams: { stream: streamCode }   // 🔥 IMPORTANT
    });
  }
}
