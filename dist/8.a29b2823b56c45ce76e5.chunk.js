webpackJsonp([8],{669:function(t,e,r){"use strict";var n=this&&this.__decorate||function(t,e,r,n){var o,c=arguments.length,i=c<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,r,n);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(i=(c<3?o(i):c>3?o(e,r,i):o(e,r))||i);return c>3&&i&&Object.defineProperty(e,r,i),i},o=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},c=r(3),i=r(22),s=r(387),a=r(670),l=r(671),d=r(672),f=function(){function ResultHistoryModule(){}return ResultHistoryModule}();f=n([c.NgModule({imports:[a.routing,s.ReactiveFormsModule,s.FormsModule,i.CommonModule],declarations:[l.ProgressComponent,d.ScoreComponent]}),o("design:paramtypes",[])],f),e.ResultHistoryModule=f},670:function(t,e,r){"use strict";var n=r(49),o=r(671),c=r(672),i=[{path:"progress",component:o.ProgressComponent},{path:"score",component:c.ScoreComponent}];e.routing=n.RouterModule.forChild(i)},671:function(t,e,r){"use strict";var n=this&&this.__decorate||function(t,e,r,n){var o,c=arguments.length,i=c<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,r,n);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(i=(c<3?o(i):c>3?o(e,r,i):o(e,r))||i);return c>3&&i&&Object.defineProperty(e,r,i),i},o=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},c=r(3),i=function(){function ProgressComponent(){}return ProgressComponent}();i=n([c.Component({template:"<h1>progress.component</h1>"}),o("design:paramtypes",[])],i),e.ProgressComponent=i},672:function(t,e,r){"use strict";var n=this&&this.__decorate||function(t,e,r,n){var o,c=arguments.length,i=c<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,r,n);else for(var s=t.length-1;s>=0;s--)(o=t[s])&&(i=(c<3?o(i):c>3?o(e,r,i):o(e,r))||i);return c>3&&i&&Object.defineProperty(e,r,i),i},o=this&&this.__metadata||function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)},c=r(3),i=r(660),s=function(){function ScoreComponent(t){this.quizHttpService=t,this.scoreHistory={}}return ScoreComponent.prototype.ngOnInit=function(){var t=this;this.quizHttpService.loadUserScoreHistory().subscribe(function(e){console.log(e),t.scoreHistory=e},function(t){console.log(t)})},ScoreComponent}();s=n([c.Component({template:r(673)}),o("design:paramtypes",[i.QuizHttpService])],s),e.ScoreComponent=s},673:function(t,e){t.exports='<br>\r\n   <section>\r\n    <div class="container">\r\n        <div class="row">\r\n            <div class="col-md-12">\r\n                 <!-- start title -->\r\n                    <div class="col-md-8 col-md-offset-2 text-center">\r\n                        <h2>Result History</h2>\r\n                    </div>\r\n                    <!-- end title -->\r\n             </div>\r\n        </div>\r\n    </div>\r\n</section>\r\n<hr/>\r\n<br>\r\n\r\n<section class="container">\r\n\t<div *ngIf="!scoreHistory.scoreAvailable">\r\n\t\t<h1>You have not given any test yet.</h1>\r\n\t</div>\r\n\r\n\t<div *ngIf="scoreHistory.scoreAvailable">\r\n\r\n\t\t<table class="table table-striped table-responsive">\r\n\t\t\t<thead>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<th>S.No.</th>\r\n\t\t\t\t\t<th>Quiz Name</th>\r\n\t\t\t\t\t<th>Date</th>\r\n\t\t\t\t\t<th>Time</th>\r\n\t\t\t\t\t<th>Score</th>\r\n\t\t\t\t\t<th>Percent</th>\r\n\t\t\t\t</tr>\r\n\t\t\t</thead>\r\n\t\t\t<tbody>\r\n\t\t\t\t<tr *ngFor="let score of scoreHistory.scores; let i = index">\r\n\t\t\t\t\t<td>{{i+1}}</td>\r\n\t\t\t\t\t<td>{{score.quizName}}</td>\r\n\t\t\t\t\t<td>{{score.date | date : \'longDate\'}}</td>\r\n\t\t\t\t\t<td>{{score.date | date : \'mediumTime\'}}</td>\r\n\t\t\t\t\t<td>{{score.score}}</td>\r\n\t\t\t\t\t<td>{{score.percent}}</td>\r\n\t\t\t\t</tr>\r\n\t\t\t</tbody>\r\n\t\t</table>\r\n\t</div>\r\n'}});
//# sourceMappingURL=8.a29b2823b56c45ce76e5.chunk.js.map