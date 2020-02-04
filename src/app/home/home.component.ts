import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService} from '@services/utils.service';
import { StorageService } from '@services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    public utils: UtilsService,
    private router: Router,
    public storage: StorageService
  ) { }

  ngOnInit() {
  }

  goto(game) {
    this.storage.set('game', game);
    this.router.navigate(['room', game]);
  }

}
