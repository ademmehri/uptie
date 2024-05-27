import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { responseauth } from '../models/responseauth';
import { employee } from '../models/employee.model';
import { filee } from '../models/filee.model';
import { authentification } from '../models/authentification.model';
import { userconnect } from '../models/user.model';
import { Router } from '@angular/router';
import { cordoffre} from '../models/offre.model';
import { Offre } from '../models/listoffre.model';
import { listoffre } from '../models/empoffre.model';
import { patronemp } from '../models/patronemp.model';
import { getlistemp } from '../models/getlistemp.model';
import { listemps } from '../models/listemps.model';
import { Role } from '../models/Role.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedin=false;
  private url="http://localhost:8080"
  constructor(private httpclt:HttpClient,private route:Router) {

   }
   getItem(){
    return sessionStorage.getItem("jwt");
  }
   login(credentials: { email: string, password: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    this.loggedin=true;
    const options = { headers, observe: 'response' as 'response' };
    return this.httpclt.post<any>(this.url+`/login`, credentials, options);
  }

   existmail(email:string):Observable<Boolean>{
    return this.httpclt.get<Boolean>(this.url+"/auth/exists/"+email);
   }
   verificationemail(email:string):Observable<any>{
    const formData: FormData = new FormData();
    formData.append('email', email);
    return this.httpclt.post<any>(this.url+"/auth/verifieremail",formData);
   }
   adduser(us:employee):Observable<String>{
    return this.httpclt.post(this.url+"/auth/addUser",us,{responseType:'text'});
   }
   addentreprise(us:employee):Observable<String>{
    return this.httpclt.post(this.url+"/auth/addentreprise",us,{responseType:'text'});
   }
   addemployee(emp:employee):Observable<employee>{
    console.log(emp)
    return this.httpclt.post<employee>(this.url+"/auth/save",emp);
       }
       addfile(file:File,mail:string):Observable<String>{
        const formData: FormData = new FormData();
    formData.append('file', file);
        return this.httpclt.post(this.url+"/auth/savefichier/"+mail,formData,{responseType: 'text'});
           }
           addcv(file:File,mail:string):Observable<String>{
            const formData: FormData = new FormData();
        formData.append('file', file);
            return this.httpclt.post(this.url+"/auth/addcv/"+mail,formData,{responseType: 'text'});
               }

   getemployee(mail:string):Observable<employee>{
    return this.httpclt.get<employee>(this.url+"/auth/getemployeebyemail/"+mail)
   }
   getemployeefile(mail:string):Observable<filee>{
      return this.httpclt.get<filee>(this.url+"/file/getfile/"+mail)
     }
   updatemployee(emp:employee):Observable<employee>{
    return this.httpclt.post<employee>(this.url+"/auth/update",emp);
   }

  
  
   save(acessToken:string,email:string,role:string){
    sessionStorage.setItem("jwt",acessToken);
    sessionStorage.setItem("email",email);
    sessionStorage.setItem("role",role);
   }
   logout(){
  
    sessionStorage.clear();
    this.loggedin=false;
    this.route.navigate(["login"]);
   }

    updatefile(file:File,id:bigint):Observable<filee>{
      const formData: FormData = new FormData();
  formData.append('file', file);
      return this.httpclt.post<filee>(this.url+"/file/updatefile/"+id,formData);
         }
         updatecv(file:File,id:bigint):Observable<filee>{
          const formData: FormData = new FormData();
      formData.append('file', file);
          return this.httpclt.post<filee>(this.url+"/file/updatecv/"+id,formData);
             }
         getprofilemployee(id:bigint):Observable<employee>{
          return this.httpclt.get<employee>(this.url+"/auth/getemployeebyid/"+id);
         }
         getuserbyemail(email:string):Observable<employee>{
          return this.httpclt.get<employee>(this.url+"/auth/getuserbyemail/"+email);
         }
         getfileprofile(id:bigint):Observable<filee>{
          return this.httpclt.get<filee>(this.url+"/file/getfileemploye/"+id);
         }
         getcv(id:bigint):Observable<filee>{
          return this.httpclt.get<filee>(this.url+"/file/getcv/"+id);
  
         }
         userconnecter(){
          let user:userconnect=JSON.parse(sessionStorage.getItem("userc")!);
          if(user.role=="user"){
            this.route.navigate(["profilemployee/"+user.id]);

          }
          else{
            this.route.navigate(["profilpatron/"+user.id]);
          }

         }
         addoffre(off:cordoffre):Observable<Offre>{
          return this.httpclt.post<Offre>(this.url+"/offre/addoffre",off)
        
        }
          getoffre(idemp:bigint):Observable<listoffre[]>{
            return this.httpclt.get<listoffre[]>(this.url+"/offre/getoffre/"+idemp);
          }
          getlistemployee(cordlistemp:getlistemp):Observable<patronemp[]>{
            return this.httpclt.post<patronemp[]>(this.url+"/auth/recherche",cordlistemp);
          }
         
         
          confirmemail(token:string,mail:string):Observable<String>{
            return this.httpclt.get(this.url+"/auth/confirmtoken/"+token+"/"+mail,{responseType: 'text'});
          }
          sendemail(mail:string):Observable<String>{
            return this.httpclt.get(this.url+"/auth/sendemail/"+mail,{responseType: 'text'});
          }
          
          
          getallemployee():Observable<listemps[]>{
            return this.httpclt.get<listemps[]>(this.url+"/auth/getallemployee");
          }
          
           updatepassword(use:employee):Observable<any>{
            return this.httpclt.post(this.url+"/auth/updatePassword",use,{responseType: 'text'});
           }
           getemployees():Observable<employee[]>{
            return this.httpclt.get<employee[]>(this.url+"/auth/getemployees");
          }
          getroleemployee(email:string):Observable<Role[]>{
            return this.httpclt.get<Role[]>(this.url+"/auth/getrole/"+email)
            .pipe(map(clients=>this.filterClientsBySession(clients,this.getItem()!))
          )
          }
          getemployeeGold():Observable<employee[]>{
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +this.getItem(),
            });
            return this.httpclt.get<employee[]>(this.url+"/auth/rechercheemployeeGold",{headers})
            .pipe(map(clients=>this.filterClientsBySession(clients,this.getItem()!))
          )
          }
          getemployeeSuperieur():Observable<employee[]>{
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +this.getItem(),
            });
            return this.httpclt.get<employee[]>(this.url+"/auth/rechercheemployeesuperieur",{headers})
            .pipe(map(clients=>this.filterClientsBySession(clients,this.getItem()!))
          )
          }
          getemployeeRestaurer():Observable<employee[]>{
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +this.getItem(),
            });
            return this.httpclt.get<employee[]>(this.url+"/auth/rechercheemployeerestaurer",{headers})
            .pipe(map(clients=>this.filterClientsBySession(clients,this.getItem()!))
          )
          }
          getemployeeServir():Observable<employee[]>{
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +this.getItem(),
            });
            return this.httpclt.get<employee[]>(this.url+"/auth/rechercheemployeeServir",{headers})
            .pipe(map(clients=>this.filterClientsBySession(clients,this.getItem()!))
          )
          }
          getemployeeSuperieur_res():Observable<employee[]>{
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +this.getItem(),
            });
            return this.httpclt.get<employee[]>(this.url+"/auth/rechercheemployeeSuperieur_r",{headers})
            .pipe(map(clients=>this.filterClientsBySession(clients,this.getItem()!))
          )
          }
          getemployeeRestaurer_res():Observable<employee[]>{
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +this.getItem(),
            });
            return this.httpclt.get<employee[]>(this.url+"/auth/rechercheemployeeRestaurer_r",{headers})
            .pipe(map(clients=>this.filterClientsBySession(clients,this.getItem()!))
          )
          }
          getemployeeServir_res():Observable<employee[]>{
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +this.getItem(),
            });
            return this.httpclt.get<employee[]>(this.url+"/auth/rechercheemployeeServir_r",{headers})
            .pipe(map(clients=>this.filterClientsBySession(clients,this.getItem()!))
          )
          }
          getemployeeGold_res():Observable<employee[]>{
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +this.getItem(),
            });
            return this.httpclt.get<employee[]>(this.url+"/auth/rechercheemployeeGold",{headers})
            .pipe(map(clients=>this.filterClientsBySession(clients,this.getItem()!))
            )
         
          }
          getemployeebyEtatAndGouverneratAndSpecialiteAndSexe(etat:string,gouvernerat:string,specialite:string,sexe:string):Observable<employee[]>{
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +this.getItem(),
            });
            return this.httpclt.get<employee[]>(this.url+"/auth/rechercheParEtatAndGouvernoratAndSpecialiteAndSexe/"+etat+"/"+gouvernerat+"/"+specialite+"/"+sexe,{headers});
          }
          getoffrecrrerparemployeur(id:bigint):Observable<any[]>{
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +this.getItem(),
            });
            return this.httpclt.get<any[]>(this.url+"/offre/getoffrecrerparemployeur/"+id,{headers});
          }
         deleteoffre(id:bigint):Observable<string>{
          const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +this.getItem(),
          });
            return this.httpclt.delete(this.url+"/offre/deleteoffre/"+id,{responseType: 'text',headers});
          }
          isLoggedIn() {
            return this.loggedin;
          }
          getnbsp():Observable<any>{
           
            return this.httpclt.get<any>(this.url+"/auth/getsp");
          }
        

           /* --------- get token cration date ------------*/
   getTokenCreationDate(authtoken:string): Date | null {
   
    if (authtoken) {
      const tokenPayload = JSON.parse(atob(authtoken.split('.')[1]));
        const expirationTime = tokenPayload.exp * 1000; 
        const creationTime = expirationTime - (60 * 60 * 1000); 
        return new Date(creationTime);
    }
    return null;
  }
  /***------------ end ------------ */
  

  filterClientsBySession(clients: any[],authtoken:string): any[] {
   
    const tokenCreationDate = this.getTokenCreationDate(authtoken); // Assuming you have a method to get token creation date
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Filter clients based on session creation date
    return clients.filter(client => {
      const sessionCreationDate = new Date(client.sessionCreationDate);
      return sessionCreationDate >= thirtyDaysAgo && tokenCreationDate && sessionCreationDate <= tokenCreationDate;
    });
  }
/*  getlistemployeegouv(gouv: string, authtoken: string): Observable<patronemp[]> {
    return this.httpclt.get<patronemp[]>("http://localhost:8087/auth/recherchegouver/" + gouv)
      .pipe(
        map(clients => this.filterClientsBySession(clients, authtoken))
      );
} */


}
