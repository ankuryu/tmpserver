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
  methods: {
  inirec : function() {
   let ptr = this.rec ;
   ptr.id = 0;
   ptr.fname = '';
   ptr.lname = "";
   ptr.mbl = "";
   ptr.street = "";
   ptr.city = "";
   ptr.pin = "";
   ptr.country = "";
  },
  savit:function(){
  //debugger ;
    let idx = this.rec.id ;
    if (idx == 0){
      this.recs.push({}) ;
      idx = this.recs.length - 1 ;
      this.rec.id = idx ;
    }
    this.trsftoar(idx)   
    this.dsblflg = 1 ;
    this.opbtflg = 0 ;

  },
  cancit:function(){},
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
  edirec: function(){
   console.log("Editing..")
   this.dsblflg = 0 ;
   this.opbtflg = 1 ;

  },
  delrec: function(){
   console.log("Deleting..")
  },
  putrecs: function(){
   console.log("Putting..")
   let mx = this.recs.length ;
   console.log(mx)
   for (i= 0; i<mx ;i++) {
    tmprec = this.recs[i]
    Axios.post('http://localhost:3000/addr/api/add.json',tmprec).then((resp)=>{
     console.log("Added record ",i," Successfully ")
    }).catch((err)=>{
    console.log("Error in inserting Rec @ ",i,err);
    }) // catch loop ends here
   } // for loop ends here
  }, // end of putrecs method
  getrecs: function(){
   console.log("Getting..")
   Axios.get('http://localhost:3000/addr/api/lst10').then(function(res){}).catch(function(err){})
  }
  }
}
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
