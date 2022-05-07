import { Quiz } from './../quiz.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getUsersInfo(){
    return this.http.get<any>("http://localhost:3000/allUsers/");
   }

  postUser(data:any){
    return this.http.post<any>("http://localhost:3000/allUsers/",data)
  }



  //belong to Questions
  quizzes : Quiz[] = [
    {
      question : "ما هي عاصمة مصر ؟",
      answer :[
        {option:'شمال سيناء',correct:false},
        {option:"الاسكندرية",correct:false},
        {option:'القاهرة',correct:true}
      ]
    },
    {
      question : "ما هي عاصمة الامارات ؟",
      answer :[
        {option:'ابوظبي',correct:true},
        {option:'العين',correct:false},
        {option:'الشارقة',correct:false}
      ]
    },
    {
      question : "ما هي عاصمة السعودية؟",
      answer :[
        {option:'مكة',correct:false},
        {option:'الرياض',correct:true},
        {option:'جدة',correct:false}
      ]
    },
    {
      question : "ما هي عاصمة السودان ؟ ",
      answer :[
        {option:'الدوحه',correct:false},
        {option:'ابوظبي',correct:false},
        {option:'الخرطوم',correct:true}
      ]
    },
    {
      question : "ما هي عاصمة ليبيا ؟",
      answer :[
        {option:'طرابلس',correct:true},
        {option:'صبراته',correct:false},
        {option:'طبرق',correct:false}
      ]
    },
    {
      question : "ما هي عاصمة قطر ؟",
      answer :[
        {option:'الريان',correct:false},
        {option:"الوكرة",correct:false},
        {option:'الدوحة',correct:true}
      ]
    },
    {
      question : "ما هي عاصمة الصومال ؟",
      answer :[
        {option:'مقديشو',correct:true},
        {option:'بورمة',correct:false},
        {option:'بلدوين',correct:false}
      ]
    },
    {
      question : "ما هي عاصمة عمان؟",
      answer :[
        {option:'ولاية مطرح',correct:false},
        {option:'مسقط',correct:true},
        {option:'العامرات',correct:false}
      ]
    },
    {
      question : "ما هي عاصمة الاردن ؟ ",
      answer :[
        {option:'الحصن',correct:false},
        {option:'الازرق',correct:false},
        {option:'عمان',correct:true}
      ]
    },
    {
      question : "ما هي عاصمة المغرب ؟",
      answer :[
        {option:'الرباط',correct:true},
        {option:'الدار البيضة',correct:false},
        {option:'مراكش',correct:false}
      ]
    }
  ]

  getQuizzes(){
    return this.quizzes;
  }
}
