import { Component } from '@angular/core';
import { Satellite } from './satellite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orbit-report';
  sourceList: Satellite[];
  displayList: Satellite[];

  /*constructor() {
    this.sourceList = [
       new Satellite("SiriusXM", "Communication", "2009-03-21", "LOW", true),
       new Satellite("Cat Scanner", "Imaging", "2012-01-05", "LOW", true),
       new Satellite("Weber Grill", "Space Debris", "1996-03-25", "HIGH", false),
       new Satellite("GPS 938", "Positioning", "2001-11-01", "HIGH", true),
       new Satellite("ISS", "Space Station", "1998-11-20", "LOW", true),
    ];
 }*/

 constructor() {
  this.sourceList = [];
  this.displayList = [];
  let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';

  window.fetch(satellitesUrl).then(function(response) {
     response.json().then(function(data) {

        let fetchedSatellites = data.satellites;
        console.log(fetchedSatellites)
//        this.sourceList=fetchedSatellites
        // TODO: loop over satellites
       for (let i = 0; i < fetchedSatellites.length; i++) {
          console.log(fetchedSatellites.length)
          this.sourceList.push(new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational));

          
        }
      // make a copy of the sourceList to be shown to the user
      this.displayList = this.sourceList.slice(0);
   }.bind(this));
}.bind(this));
                 
        // TODO: create a Satellite object using new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);
        // TODO: add the new Satellite object to sourceList using: this.sourceList.push(satellite);
        //return this.sourceList;
/*     }.bind(this));
  }.bind(this));*/

}

//TRIED TO INSERT CODE FROM 8.6 HERE. Cause my computer to freeze up when I tried to ng serve. For a brief second I got an error for excessive recursion.

search(searchTerm: string): void {
  let matchingSatellites: Satellite[] = [];
  searchTerm = searchTerm.toLowerCase();
  for(let i=0; i < this.sourceList.length; i++) {
     let name = this.sourceList[i].name.toLowerCase();
     if (name.indexOf(searchTerm) >= 0) {
        matchingSatellites.push(this.sourceList[i]);
     }
  }
  // assign this.displayList to be the array of matching satellites
  // this will cause Angular to re-make the table, but now only containing matches
  this.displayList = matchingSatellites;
}

}
