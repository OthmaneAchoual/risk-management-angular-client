import { Component } from '@angular/core';

// import { Wakanda } from './wakanda.service';

@Component({
  selector: 'app-root',
  // providers: [Wakanda],
  providers: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // constructor(public wakanda: Wakanda) {
  //   /**
  //    * To customize the behaviour of the Wakanda service,
  //    * edit the wakanda.service.ts file content.
  //    */

  //   /**
  //    * Example 1:
  //    * Get Wakanda Catalog
  //    */
  //   wakanda.getCatalog()
  //     .then((ds) => {
  //       /**
  //        * Do something
  //        */
  //     });

  //   /**
  //    * Example 2:
  //    * Get the catalog only if a user is logged-in.
  //    *
  //    * For more details about getCurrentUser, visit: https://wakanda.github.io/doc/#/guide?section=main-data-cs-directorymethods
  //    */
  //   wakanda.directory.getCurrentUser()
  //     .then(user => {
  //       /**
  //        * To access current user info, use : user.userName, user.fullName, user.ID
  //        */
  //       wakanda.getCatalog()
  //         .then((ds) => {
  //           /**
  //            * Do something
  //            */
  //         });
  //     })
  //     .catch(error => {
  //       console.log("No user is logged-in");
  //     });
  // }
}
