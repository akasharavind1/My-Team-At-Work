import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicefilesService {
  url="http://localhost:8080/api/v1";

  constructor(private http:HttpClient) {}
 
     IsLoggedAdmin(){
      if(localStorage.getItem("tokenadmin")=="AH2EjtcmoURSXm2RhZ8ihnJrsty"){
     return !!localStorage.getItem("tokenadmin");
    }
    return null;
  }
     IsLoggedUser(){
      if(localStorage.getItem("tokenuser")=="7Ewm3NEnJDM"){   
      return !!localStorage.getItem("tokenuser");
    }
    return null;
  }
     IsLoggedUserId()
   { 
    return !!localStorage.getItem("idd");
  }
  
    getEmployeeList(){
      return this.http.get(`${this.url}/getLogin`)
    }

    getEmployeeListByTeam(teamId:any){
      return this.http.get(`${this.url}/getLoginByTeam/`+ teamId)
    }
    getEmployee(id: any){
      return this.http.get(`${this.url}/employeeInfo/`+id)
    }
    //  getDates2(empIds: number){
    //   return this.http.get(`${this.url}/getDatesDemo/`+empIds)
    // }
    getDates(dummy1: number){
      return this.http.get(`${this.url}/getDates/`+dummy1)
    }
    getId(){
      return this.http.get(`${this.url}/getLogin`)
    }
    getdetails(id: number){
      return this.http.delete(`${this.url}/getdetails/`+id);
    }
    postEmployee(body:any){
      return this.http.post(`${this.url}/signup`,body)
    }
    postDates(body:any, id:any){
      return this.http.post(`${this.url}/postDates/`+id,body)
    }   
    deleteDates(body:any, empId:any){
      return this.http.delete(`${this.url}/empDateDelete/`+empId,body)
    }
    postLogin(body:any){
            return this.http.post(`${this.url}/login`,body);
          }
    updateEmployee(id: number, body:any){
            return this.http.put(`${this.url}/update/`+id,body);
          }
    postId(id:number){
            return this.http.post(`${this.url}/postId?id=`,id);
          }
    deleteEmployee(id:number){
      return this.http.delete(`${this.url}/delete?id=`+id);
    }
    checkSpecificEmp(id:number,teamName:any){
      return this.http.get(`${this.url}/employeeInfoForUser?id=${id}&teamName=${teamName}`);
    }
    matchingDates(days:any,teamName:any){
      return this.http.post(`${this.url}/matchDates?teamName=`+teamName,days);
    }
    updatePassword(id: string, body: any){
      return this.http.put(`${this.url}/updatePassword/`+id,body);
    }

    addTeam(body:any){
      return this.http.post(`${this.url}/addTeam`,body);
    }

    }