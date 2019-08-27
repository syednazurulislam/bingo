import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NavController} from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Subject } from 'rxjs';
import {FormBuilder,FormGroup,FormControl, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
PhoneNumber:number;
Email:string='';
Name:string='';
Password:string='';
phonenumbererror:string='';
emailerror:string='';
nameerror:string='';

public registerationform:FormGroup;
error_messages={
  'Email':[
    {type:'required',message:"Email is required"},
    {type:'pattern',message:"Please enter valid email"}
  ],
  'PhoneNumber':[{type:'required', message:"Phonenumber is required"},
{type:'pattern', message:"please enter valid phonenumber"},
{type:'maxlength',message:"phonenumber should not exceed 10"},
{type:'minlength', message:"phonenumber should be minimum 10"}],

'Name':[{type:'required', message:"Name is required"},
{type:'maxlength',message:"Name should not exceed 10"},
{type:'minlength', message:"Name should be minimum 3"}],
'Password':[
  {type:'required', message:"Password is required"},
{type:'maxlength',message:"password should not exceed 15"},
{type:'minlength', message:"password should be minimum 6"}]
  
}
private searchTerm = new Subject<string>();
  constructor(private router:Router, private navctrl:NavController,private http:HttpClient,public formBuilder:FormBuilder ) {

this.registerationform= this.formBuilder.group({
  PhoneNumber:new FormControl('',Validators.compose([Validators.maxLength(10),Validators.minLength(10),Validators.required,Validators.pattern('[0-9]*')])),
  Email:new FormControl('', Validators.compose([Validators.required,Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")])),
  Name:new FormControl('',Validators.compose([Validators.maxLength(10),Validators.minLength(3), Validators.required])),
  Password:new FormControl('',Validators.compose([Validators.maxLength(15),Validators.minLength(6),Validators.required]))
});





    this.searchTerm.pipe(debounceTime(300),distinctUntilChanged()).subscribe((search:any)=>{
      
      var serverdata={
        entereddata:search.target.value,
        enteredid:search.target.id
      }
      let headers = new HttpHeaders();
      headers.append('Content-Type','application/json');
      this.http.post("http://192.168.0.168:5225/api/finduserlike", serverdata, {headers:headers}).subscribe(data=>{
        if(data=="phonenumber not available"){
          this.phonenumbererror="number already exsists";
          this.nameerror='';
          this.emailerror='';

        }
        else if(data=="Name not available"){
this.nameerror="name already exsists";
this.phonenumbererror='';
this.emailerror='';
        }
        else if(data=="Email not available"){
          this.emailerror="email already exsists";
          this.nameerror='';
          this.phonenumbererror='';
                  }

                  else if(data=="phonenumber available"){
                    this.emailerror="";
                    this.nameerror='';
                    this.phonenumbererror='';
                            }
                            else if(data=="Email available"){
                              this.emailerror="";
                              this.nameerror='';
                              this.phonenumbererror='';
                                      }
                                      else if(data=="Name available"){
                                        this.emailerror="";
                                        this.nameerror='';
                                        this.phonenumbererror='';
                                                }
      })

    })
   }

  


  ngOnInit() {
  }
  gotologin(){
 
    this.navctrl.navigateForward(['/login']);
  // this.router.navigate(['/login']);
  }

  search(searchtext){
  
    var regg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    
     if((searchtext.target.id=="phonenumber"&&searchtext.target.value.length==10)||(searchtext.target.id=="Email"&& (regg.test(searchtext.target.value)==true))||(searchtext.target.id=="Name"&& searchtext.target.value.length>3)){
    console.log(searchtext.target.value);
      this.searchTerm.next(searchtext); 
    }
    
      // console.log(typeof(searchtext));
    

  


  }

register(dataa){
  console.log(dataa);
  var data={
    phonenumber:dataa.PhoneNumber,
    email:dataa.Email,
    name:dataa.Name,
    Password:dataa.Password
   }
   let headers = new HttpHeaders();
   headers.append('Content-Type','application/json');
   this.http.post("http://192.168.0.168:5225/api/userregister", data, {headers:headers}).subscribe(data=>{
     alert(data);
   })
}

}
