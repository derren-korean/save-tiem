import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface Share {
  title?: string;
  text?: string;
  url?: string;
}

interface ExtendNavigator extends Navigator {
  share: (share: Share) => Promise<void>;
}

interface ExtendWindow extends Window {
  navigator: ExtendNavigator;
}

declare var window: ExtendWindow;

@Component({
  selector: 'app-share-fab',
  templateUrl: './share-fab.component.html',
  styleUrls: ['./share-fab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShareFabComponent {
  @Input() share: Share;

  async onClick() {
    
    try{
      console.log(window.navigator.canShare)
      window.navigator.share(this.share);
    } catch(error) {
      console.log('You app is not shared, reason: ',error);
    }
  }
}