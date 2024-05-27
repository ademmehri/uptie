import { Component, OnInit } from '@angular/core';
import { employee } from '../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { filee } from '../models/filee.model';

@Component({
  selector: 'app-pageoffreemployeur',
  templateUrl: './pageoffreemployeur.component.html',
  styleUrls: ['./pageoffreemployeur.component.css']
})
export class PageoffreemployeurComponent implements OnInit {
  id!:bigint;
  emp!:employee
  file!:filee
  cv!:filee
  url='assets/par2.png'
  cin!:string
  desc=''
  constructor(private router:ActivatedRoute,private userservice:UserService,private route:Router){
    this.desc=localStorage.getItem('desc')!
    this.router.params.subscribe(
      (param)=>{
        this.id=param['id']
      }
    
    )
    this.userservice.getprofilemployee(this.id).subscribe(
        res=>{
this.emp=res
this.cin=this.emp.cin
        }
      )
      console.log(this.cin)
  }
  ngOnInit(): void {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    this.userservice.getfileprofile(this.id).subscribe(
      res=>{
this.file=res
this.url="assets/"+this.file.titlefile
       }
     )



  }
  logout(){
    this.userservice.logout();
    this.route.navigate(["pageprincipale"]);
  }
}
