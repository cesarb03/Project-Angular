import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/core/models/user.model';
import { SessionService } from 'src/app/core/services/session/session.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnDestroy {
  @Output() toggleSidebar = new EventEmitter();
  public user: User | null = null;
  private destroyed$ = new Subject();

  // constructor(private readonly sessionService: SessionService, public readonly authService: AuthService) {

  // }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
