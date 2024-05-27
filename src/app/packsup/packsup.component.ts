import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-packsup',
  templateUrl: './packsup.component.html',
  styleUrls: ['./packsup.component.css']
})
export class PacksupComponent implements OnInit{
  pac=''
constructor(private route:Router){
  this.pac=localStorage.getItem('pack')!
  localStorage.clear()
}
  ngOnInit(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }


acheter(ch:string){
  if(ch==='sixmois'){
    localStorage.setItem('duree','six_mois')
  }
  else{
    localStorage.setItem('duree','un_ans')
  }
  this.route.navigate(['/test'])
}
}
