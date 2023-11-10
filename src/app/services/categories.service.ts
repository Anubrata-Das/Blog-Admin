import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs:AngularFirestore, private toastr:ToastrService) { }

  // for adding category 
  saveData(data: unknown){
    
    this.afs.collection('categories').add(data).then(docRef=>{
      console.log(docRef);
      this.toastr.success('Category added Successfully')
    })
    .catch(err => {console.log(err);
    })
  }

  // for retrieve data 
  loadData(){
    return this.afs.collection('categories').snapshotChanges().pipe(
      map(actions =>{
        return actions.map(a=>{

          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return {id,data}
        })
      })
    )
  }

  updateData(id: any,Editdata: any){
    this.afs.collection('categories').doc(id).update(Editdata).then(docRef =>{
      this.toastr.success('Category Updated Successfully')
    })
  }

  deleteData(id:any){
    this.afs.collection('categories').doc(id).delete().then(docRef =>{
      this.toastr.success('Category Deleted Successfully')
    })
  }
}
