import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { Quiz } from '../quiz.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent{
  quizzes : Quiz[] = [];
  currentQuiz = 0;
  answerSelected = false;
  correctAnswers = 0 ;
  incorrectAnswers = 0 ;
  result = false ;
  rendomiz!:number ;
  constructor(private quizService:ApiService) {
    this.quizzes = this.quizService.getQuizzes();
  }

  showResult(){
    this.result = true ;
  }



  ngOnInit(): void {
    this.quizzes = this.quizService.getQuizzes();
    this.rendomiz = Math.floor(Math.random() * this.quizzes.length)
    // var currentQuiz = Math.floor(Math.random() * this.quizzes.length)
    // console.log('Current Quiz : ',currentQuiz);
  }

  // currentQuiz = Math.floor(Math.random() * this.quizzes.length);
  onAnswer(option:boolean){
    this.answerSelected = true;
    setTimeout(()=>{
      this.currentQuiz++;
      this.rendomiz = Math.floor(Math.random() * this.quizzes.length)
      this.answerSelected = false;
    },3000)
    if(option){
      this.correctAnswers++;
    }else{
      this.incorrectAnswers++
    }

  }


}
