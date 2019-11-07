import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed-gallery',
  templateUrl: './feed-gallery.page.html',
  styleUrls: ['./feed-gallery.page.scss'],
})
export class FeedGalleryPage implements OnInit {
masonryItems = [
    { img : 'assets/img/selfie.jpg' },
    { img : 'assets/img/selfie1.png'  },
    { img : 'assets/img/selfie2.jpg'  },
    { img : 'assets/img/selfie3.jpg'  },
    { img : 'assets/img/selfie4.jpg'  },
    { img : 'assets/img/selfie5.jpg'  },
    { img : 'assets/img/selfie6.jpg'  },
    { img : 'assets/img/selfie7.jpg'  },
    { img : 'assets/img/selfie8.jpg'  },
    { img : 'assets/img/selfie9.jpg'  }
  ];
  constructor() { }

  ngOnInit() {
  }

}
  