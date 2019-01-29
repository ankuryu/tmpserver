<template>
  <div class="hello">
<!-- <script src="https://unpkg.com/axios/dist/axios.min.js"></script> -->

<div id="app">
  <h3 class="hdgout">
    Output Data
  </h3>
  <div class="tblcont">
    <div class="tblsr">Sr</div>
    <div class="tblfnam">First Name</div>
    <div class="tbllnam">Last Name</div>
    <div class="tblmbl">Mobile</div>
    <div class="tblsel">Sel</div>
    <template v-for="(irec,index) in recs">
    <div class="tblsr">{{index+1}}</div>
    <div class="tblfnam">{{irec.fname}}</div>
    <div class="tbllnam">{{irec.lname}}</div>
    <div class="tblmbl">{{irec.mbl}}</div>
    <div class="tblsel"><input type="radio" v-model="sel" :value="index" @click="trsffrar(index)"></div>
      
    </template>
  </div>
  <hr>
  <h3 class="hdginp">
    Input Data
  </h3>
 
  
  
  <div class="inpcont">
 
    <div class="name"><input type="text" v-model="rec.fname" placeholder="Firt Name" :disabled="dsblflg == 1"></div>
    <div class="lname"><input type="text" v-model="rec.lname" placeholder="Last Name" :disabled="dsblflg == 1"></div>
    <div class="mbl"><input type="text" v-model="rec.mbl" placeholder="Mobile/Phone" :disabled="dsblflg == 1" ></div>
    <div class="street"><input type="text" v-model="rec.street" placeholder="Street" :disabled="dsblflg == 1"></div>

    <div class="city"><input type="text" v-model="rec.city" placeholder="City" :disabled="dsblflg == 1"></div>
    <div class="pin"><input type="text" v-model="rec.pin" placeholder="Pin Code" :disabled="dsblflg == 1"> </div>
    <div class="country"><input type="text" v-model="rec.country" placeholder="Country" :disabled="dsblflg == 1"></div>
    <div class="save"><button @click="savit" :disabled="dsblflg == 1">Save</button></div>
    <div class="canc"><button @click="cancit" :disabled="dsblflg == 1">Cancel</button></div>

  </div>
  <hr>
  <div class="oprcont">
    <div class="add"><button @click="addrec" :disabled = "opbtflg == 1">Add</button></div>
    <div class="edit"><button @click="edirec" :disabled = "opbtflg == 1" >Edit</button></div>
    <div class="del"><button @click="delrec" :disabled = "opbtflg == 1">Delete</button></div>
    <div class="upload"><button @click="putrecs" :disabled = "opbtflg == 1">Upoad</button></div>
    <div class="dwnload"><button @click="getrecs" :disabled = "opbtflg == 1">Download</button></div>
  </div>
</div>
	  
  </div>
</template>

<script>
import Axios from 'axios';
export default {
  name: 'addr',
  data: function(){
		return{
  sel:0,
  dsblflg : 1,
  opbtflg : 0,
  rec: {id:0,
  fname:"",
  lname:"",
  mbl:"",
  street:"",
  city:"",
  pin:"",
  country:""
  },
    recs: [ ]
    }},
    created: function() {
      Axios.get('http://localhost:3000/addr/api/lst10')
      .then((resp)=>{
        this.recs = resp.data ;
        this.sel = 0 ;
        this.trsffrar(this.sel) ;
       })
      .catch((err)=>{
        console.log( err );
      })
    },
  methods: {
  inirec : function() {
   let ptr = this.rec ;
   ptr.id = -1 ;
   ptr.fname = '';
   ptr.lname = "";
   ptr.mbl = "";
   ptr.street = "";
   ptr.city = "";
   ptr.pin = "";
   ptr.country = "";
  },
  savit: async function(){
  //debugger ;
  try {
    
    let idx = this.rec.id ;
    let  nx = 0 ;
    if (idx == -1 ){
      // one is saving a freshly added record so add in array
      this.recs.unshift({}) ;
      nx = 0 ;
     //this.rec.id = await this.getmxid()+ 1 ;  
    } else {
       nx = this.sel
    }
    this.trsftoar(nx)   
    this.putrec(this.rec);
//  console.log(nx,this.recs,this.rec);
    this.dsblflg = 1 ;
    this.opbtflg = 0 ;
    } catch (error) {

    }
  },
  cancit:function(){
    // cancel it
    let nx = 0 ;
    if(this.rec.id != -1 ){
      nx = this.sel
    } 
    this.trsffrar(nx)
    this.sel = nx ;
    this.dsblflg = 1 ;
    this.opbtflg = 0 ;
  },
  trsftoar: function(idx){
   let tmp = this.recs[idx] ;
   let r = this.rec ;
   tmp.id =  r.id ;
   tmp.fname = r.fname;
   tmp.lname = r.lname;
   tmp.mbl = r.mbl;
   tmp.street = r.street;
   tmp.city = r.city;
   tmp.pin = r.pin;
   tmp.country = r.country;
  },
  trsffrar : function(idx){
   let tmp = this.recs[idx] ;
   let r = this.rec ;
   r.id =  tmp.id ;
   r.fname = tmp.fname;
   r.lname = tmp.lname;
   r.mbl = tmp.mbl;
   r.street = tmp.street;
   r.city = tmp.city;
   r.pin = tmp.pin;
   r.country = tmp.country;
  
  },
  addrec: function(){
   console.log("Adding..")
   this.inirec();
   this.dsblflg = 0 ;
   this.opbtflg = 1 ;
  },
  edirec: function(aid){
   console.log("Editing..")
   this.dsblflg = 0 ;
   this.opbtflg = 1 ;
  },
  delrec: function(){
    let aid = this.sel ;
   console.log("Deleting..")
   let tmprec = this.recs[aid];
   console.log(" tmprec ",this.recs,aid)
   if (tmprec.id != -1){
     // delete from the database also
     Axios.delete('http://localhost:3000/addr/api/del/'+tmprec.id.toString())
     .then(()=>{console.log("Deleted Rec Id "+tmprec.id.toString())})
     .catch((err)=>{
       console.log(err)
     })
   } 
     // now delete from the array 
     this.recs.splice(aid,1)
     console.log("Recs after deleting  ",this.recs)
   },
  putrec :  async function(tmprec){
    try {
     console.log('putrec data ', tmprec);
     if(tmprec.id == -1){
        console.log(" Adding new rec ");
       let newid =  await this.getmxid()+1 ;
       tmprec.id = newid ;
       console.log(" Rec Id " + tmprec.id.toString() );
    Axios.post('http://localhost:3000/addr/api/add.json',tmprec).then((resp)=>{
     console.log("Added record ",aid," Successfully ")
    }).catch((err)=>{
    console.log("Error in inserting Rec @ ",aid,err);
    }) // catch loop ends here
     }else {
       let sid = tmprec.id.toString() ;
       Axios.put('http://localhost:3000/addr/api/upd/'+sid,tmprec)
       .then(()=>{

       })
       .catch((err)=>{
         console.log("Error in updating Record @",sid)
       })
     }
    } 
    catch(err){
      console.log(err)
    }
  },
  getmxid: function(){
    return new Promise((resolve,reject)=>{
    // gets the maximum id in the database to fill in the next id into the fresh record
   console.log("Getting Max ID")
    Axios.get('http://localhost:3000/addr/api/mxid')
    .then((res)=>{console.log("Max Id",res.data.mxid)
      resolve(res.data.mxid) ;
      })
    .catch((err)=>{console.log("Error in Max id" ,err) 
      reject(err); 
     })
    })
  },
  getrec : function(rid){
    // rid is the record id as integer
    let srid = string(rid);
   console.log("Getting a single rec with id ."+srid )
    Axios.get('http://localhost:3000/addr/api/rec/'+srid)
    .then((res)=>{console.log("Got record ",srid )
      return res ;
      })
    .catch((err)=>{console.log("Error in getting record ",srid ,err) })
  },
  putrecs: function(){
    // puts /updates the  records in the array to database
    console.log("Putting..")
   let mx = this.recs.length ;
   console.log(mx)
	  let i = 0;
   for (i = 0; i < mx ; i++) {
     this.putrec(this.recs[i]);
  } // for loop ends here
  }, // end of putrecs method
  getrecs: function(){
    // gets a record set  from database
    Axios.get('http://localhost:3000/addr/api/recset')
    .then((res)=>{console.log("Got record ",id )
      })
    .catch((err)=>{console.log("Error in getting record ",id ,err) })
    }
  } // end of methods
}  // end of export default
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  background: #20262E;
  padding: 20px;
  font-family: Helvetica;
}

#app {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
}

.hdgout {
  text-align: center
}

.tblcont {
  display: grid;
  background-color: lightgray;
  grid-gap: 5px;
  grid-template-columns: 25px 1fr 1fr 1fr 25px;
}

.tblsr {
  grid-column: 1 /2;
}

.tblfnam {
  grid-column: 2/3
}

.tbllnam {
  grid-column: 3/4
}

.tblmbl {
  grid-column: 4/5
}

.tblsel {
  grid-column: 5/6
}

.hdginp {
  text-align: center
}

.inpcont {
  display: grid;
  background-color: lightcyan;
  grid-gap: 3px;
  grid-template-areas: " name lname mbl" " street city pin " "country  .  ." "save canc . ";
}

.name {
  grid-area: name;
  background-color: lightskyblue
}

.lname {
  grid-area: lname;
  background-color: lightgoldenrodyellow
}

.mbl {
  grid-area: mbl;
  background-color: lemonchiffon
}

.street {
  grid-area: street;
  background-color: lightblue
}

.city {
  grid-area: city
}

.pin {
  grid-area: pin
}

.country {
  grid-area: country
}

.save {
  grid-area: save
}

.canc {
  grid-area: canc
}

.oprcont {
  display: grid;
  background-color: lightgray;
  grid-template-columns: 3em 3em 4em 4em 5em;
  grid-template-rows: 22px;
}

li {
  margin: 8px 0;
}

h2 {
  font-weight: bold;
  margin-bottom: 15px;
}

del {
  color: rgba(0, 0, 0, 0.3);
}

</style>
