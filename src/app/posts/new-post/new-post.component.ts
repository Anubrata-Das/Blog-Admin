import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {
 
isDisabled: boolean = false;
 permalink:any='';
 imgSrc:any='./assets/placeholder-1.webp';
 selectedImg:any;

 categories:any;
 postForm:FormGroup | any;
 post:any;

 formStatus:String = 'ADD NEW';
 docId:String | any;
 
 constructor(private categoryService:CategoriesService, 
  private fb:FormBuilder,
  private postService:PostsService,
  private route:ActivatedRoute
  ){

    this.route.queryParams.subscribe(val=>{

      this.docId=val['id'];

      if(this.docId){
        this.postService.loadOneData(val['id']).subscribe(post=>{
          this.post=post;
          
          this.postForm = this.fb.group({
            title:[this.post.title, [Validators.required, Validators.minLength(10)]],
            permalink:[this.post.permalink, Validators.required],
            excerpt:[this.post.excerpt, [Validators.required, Validators.minLength(40)]],
            category:[`${this.post.category.categoryId}-${this.post.category.category}`],
            postImg:['',Validators.required],
            content:[this.post.content,Validators.required],
          })
  
          this.imgSrc = this.post.postImgPath;
          this.formStatus='EDIT';
        })
      }
      else{
        this.postForm = this.fb.group({
          title:['', [Validators.required, Validators.minLength(10)]],
          permalink:['', Validators.required],
          excerpt:['', [Validators.required, Validators.minLength(40)]],
          category:[''],
          postImg:['',Validators.required],
          content:['',Validators.required],
        })
      }

     
    })

    


 }

 ngOnInit(): void {
  this.categoryService.loadData().subscribe(val=>{
    this.categories = val;
  })
}

  get fc(){
    return this.postForm.controls
  }


  onTitleChanged($event: any){
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g,'-');
    // console.log(permalink);
    
  }

  showPreview($event: any){
    const reader = new FileReader();
    reader.onload=(e) =>{
      this.imgSrc = e.target?.result;
    }
    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }

  onSubmit(){
    // console.log(this.postForm.value);

    let splitted = this.postForm.value.category.split('-');

    const postData:Post={
      title:this.postForm.value.title,
      permalink:this.postForm.value.permalink,
      category:{
        categoryId:splitted[0],
        category:splitted[1]
      },
      postImgPath:'',
      excerpt:this.postForm.value.excerpt,
      content:this.postForm.value.content,
      isFeatured:false,
      views:0,
      status:'new',
      createdAt:new Date()
    }

    // console.log(postData);
    this.postService.uploadImage(this.selectedImg,postData,this.formStatus,this.docId);
    this.postForm.reset();
    this.imgSrc='./assets/placeholder-1.webp';
  }
  

}
