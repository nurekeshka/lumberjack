import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initAsync, something } from '@projects/jack';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  async ngOnInit(): Promise<void> {
    await initAsync();

    try {
      something('../../rust/assets/logs/windows.log');
    } catch (e) {
      console.log(e);
    }
  }
}
