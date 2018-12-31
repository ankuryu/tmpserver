/*jshint esversion: 6 */
const fs = require('fs');
const  express =  require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const sqlite3  = require("sqlite3").verbose() ;


const app = express();
/*let bpth = '';
console.log('Checking for db3 files ...');
if(fs.existsSync('../db/tmp.db3')){
	pth='../db/tmp.db3' ;
         bpth = '../db/';
 }else {
	 console.log('db3 files not found... Exiting !!! ');
	 process.exit(-1);
 }
*/
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});

app.listen(3000 , function() {
 console.log( "Listening on port 3000");
});
// ==================================================

 pr1 = [] ; // pr1 is the array to contain parameters


app.put('/addr/api/upd/',(req,res)=>{
  let pth = './db/tmp.db3'
	let db = new sqlite3.Database(pth,(err)=>{
		if(err){
			console.log(err);	
		}
	});
	let sqlupd = `Update tbl1 set fname = $fname ,lname = $lname ,mbl = $mbl,street = $street ,pin = $pin ,country = $country where id = $id ;`;
		 let updobj = {} ;
		  updobj.$fname = req.body.fname 
		  updobj.$lname =  req.body.lname 
		  updobj.$mbl =  req.body.mbl
		  updobj.$street =  req.body.street
		  updobj.$pin =  req.body.pin
		  updobj.$country =  req.body.country
			updobj.$id =  req.body.id
			console.log("obj",updobj," sqlupd ",sqlupd)
	db.run(sqlupd,updobj,(err)=> {
		if(err) {
			return console.error(err.message);
		}
		  res.end();
	}).close((err)=>{
	 	if(err){
		 	console.log("Error in closing Database ",err)
		}else{
			 console.log("Database Closed Succecfully")
		}
	})
})

app.get('/addr/api/mxid',(req,res)=>{
  let pth = './db/tmp.db3'
	let db = new sqlite3.Database(pth,(err)=>{
		if(err){
			console.log(err);	
		}
	});
		let sqlmx = 'select max(id) as mxid from tbl1 ;';
	  db.get(sqlmx,(err,row)=> {
		if(err) {
			return console.error(err.message);
		}
		res.json(row);
		  res.end();
	  }).close((err)=>{
		  if(err){
			 console.log("Error in closing Database ",err)
			}else{
			 console.log("Database Closed Succecfully")
			}
})

	})

app.get('/addr/api/mktbl',(req,res)=>{
  let pth = './db/tmp.db3'
	let db = new sqlite3.Database(pth,(err)=>{
		if(err){
			console.log(err);	
		}
		let sqlmk = 'Create table if not exists tbl1 (id INTEGER PRIMARY KEY,fname TEXT,lname TEXT,mbl TEXT,street TEXT,city TEXT,pin TEXT,country TEXT) ;';
	  db.all(sqlmk,(err,rows)=> {
		if(err) {
			return console.error(err.message);
		}
		res.json(rows);
		  res.end();
	  }).close((err)=>{
		  if(err){
			 console.log("Error in closing Database ",err)
			}else{
			 console.log("Database Closed Succecfully")
			}
		});
	})
})


app.post('/addr/api/add.json', (req,res)=>{
  let pth = './db/tmp.db3'
	let db = new sqlite3.Database(pth,(err)=>{
	if(err){
		console.log("Error Opening Database ",pth,err);	
	}
})
	let sqlins = 'insert into tbl1 (fname,lname,mbl,street,city,pin,country) values (?,?,?,?,?,?,?)';
	let pr2 = []
	pr2.push(req.body.fname) ;
	pr2.push(req.body.lname);
	pr2.push(req.body.mbl);
	pr2.push(req.body.street);
	pr2.push(req.body.city);
	pr2.push(req.body.pin);
	pr2.push(req.body.country);
  db.run(sqlins,pr2,(err)=>{  
	if(err){
		 console.log("Error in inserting Data ",sqlins,err);
	}else {
		 console.log("Data inserted succesfully");
	}
	}).close((err)=>{
	if(err){
		console.log("Error in closing Database ",err)
	}else{
		 console.log("Database Closed Succecfully")
	}
	});

  })


app.get('/addr/api/lst10',(req,res)=> {
	let pth = './db/tmp.db3';
	console.log("sTarted");
	console.log("checking for db");
		console.log("finished");
 let db = new sqlite3.Database(pth,(err)=>{ 
   if(err){
	   console.log(err);
	 }
	});
	console.log("Connected to the in Sqlite database");
	let  sqlsel= " select id,fname,lname,mbl,street,city, pin ,country from tbl1 order by id desc limit 10; " ;
	 console.log(sqlsel);
	 console.log(pr1);
	  db.all(sqlsel,(err,rows)=> {
			console.log(rows)
		if(err) {
			return console.error(err.message);
		}
		res.json(rows);
		  res.end();
	  }).close();

  });
	

app.delete('/addr/api/del/:id',(req,res)=> {
	let pth = './db/tmp.db3';
	console.log("Delete path");
 let db = new sqlite3.Database(pth,(err)=>{ 
   if(err){
	   console.log(err);
   }
	console.log("Connected to the in Sqlite database");
 });
  let id = req.params.id ;
	let  sqldel= " delete from tbl1 where id == $id ; " ;
			db.run(sqldel,{"$id":id},(err)=> {
		if(err) {
			return console.error(err.message);
		}
		  res.end();
	  }).close();
  });

/*



				
// now for list of icode for the desired mfg set the route
app.get('/pmcstk/icode.json/:mfg',(req,res)=> {
	console.log("sTarted for icode");
	console.log( req.body.mfg);
	console.log("Manufac : " + req.body.mfg);
	console.log("checking for db");
		console.log("finished");
//	pr1.push(req.body.mfg) ; // pass on the mfg for which icode desired
        pr2 =[req.body.mfg] ;
 let db = new sqlite3.Database(pth,(err)=>{ 
   if(err){
	   console.log(err);
   }
	console.log("Connected to the in Sqlite database");

	console.log("oh",pr2);
	// pr1.push(req.body.mfg) ;
	let  sqlsel= "select distinct icode from stkcsm17 where mfg = ? order by icode; " ;
	  db.all(sqlsel ,pr2,(err,rows)=> {
		if(err) {
			return console.error(err.message);
		}
		res.json(rows);
		  res.end();
	  });

  });
	db.close();
	pr1.pop() ;
	});
// for list of asize,qty,loc,dt and page for mfg,icode body given set the route and processing
app.get('/pmcstk/qty.json/:mfg/:icode',(req,res)=> {
	console.log("sTarted for icode");
	console.log("checking for db");
	pr3=[req.body.mfg,req.body.icode];
//	console.log(fs.existSync('../crud64/db/stkcsm17.db3'));
		console.log("finished");
 let db = new sqlite3.Database(pth,(err)=>{ 
   if(err){
	   console.log(err);
   }
	console.log("Connected to the in Sqlite database");
	console.log(pr3);
	let  sqlsel= "select asize,qty,loc,date,pg from stkcsm17 where mfg = ? and icode = ? order by asize ; " ;
	  db.all(sqlsel ,pr3,(err,rows)=> {
		if(err) {
			return console.error(err.message);
		}
		res.json(rows);
		  res.end();
	  });

  });
	db.close();
	});

/////////////////////////////////////////////////  End of  Stock Json Server Section 

///Start of  Price Json Server Section //////////////////////////////
//

app.get('/pmcpri/lcode.json/:lc',(req,res)=> { 
  dpth = bpth + 'ldrpri18.db3' ;
	console.log('Getting prices with Lc');
	sqlstr = 'Select lcode,icode,"mm",asize,pri,mrp from ldr2018all where lcode = ? ;' ;
	apar = [req.body.lc] ;
	if(req.param.lc == "" ){
		apar = [];
		res.json([]);
		res.end();
	} else {
	console.log('param',apar)
	db = {};
        ftch_sqldata(db,dpth,sqlstr,apar).then((rslt)=>{
		res.json(rslt)
		res.end();
	console.log('back at get lcode.json');	

	});} //end of else
})
app.get('/pmcpri/icode.json/:ic',(req,res)=> {
  dpth = bpth + 'ldrpri18.db3' ;
	sqlstr = 'Select lcode,icode,"mm",asize,pri,mrp from ldr2018all where icode = ? ;' ;
	console.log('Getting prices with Ic');
	db = {};
	if(req.param.ic == "") {
		apar = [];
		res.json([]);
		res.end();
	} else {
	apar = [req.body.ic] ;
	console.log('param',apar)
        ftch_sqldata(db,dpth,sqlstr,apar).then((rslt)=>{
		res.json(rslt)
		res.end();
//	console.log('RESULT',rslt);
	console.log('back at get icode.json');	
	});
	} // end of else
});
app.get('/pmcpri/alcode.json',(req,res)=> {
  dpth = bpth + 'ldrpri18.db3' ;
	sqlstr = 'select distinct lcode from ldr2018all order by lcode ; ' ;
	console.log('Getting All Lc');
	apar =[];
	db = {};	
        ftch_sqldata(db,dpth,sqlstr,apar).then((rslt)=>{
		res.json(rslt)
		res.end();
//	console.log('RESULT',rslt);
	console.log('back at get alcode.json');	
	});

});
app.get('/pmcpri/aicode.json',(req,res)=> {
  dpth = bpth + 'ldrpri18.db3' ;
	sqlstr = 'select distinct icode from ldr2018all order by icode;  ' ;
	console.log('Getting All Ic');
	apar = [] ;
	db = {};
	console.log('In Aicode : ',dpth,sqlstr,apar);
         ftch_sqldata(db,dpth,sqlstr,apar).then((rslt)=>{
	console.log('back at get aicode.json');	
	//res.json({"icode":"GATCL1"});
	res.json(rslt)
		 res.end();
	});

});



/////////////////////// start of functions ////////////////////////////


//  Function to open a sqlte data and fetch data using the sql string
   async function ftch_sqldata(db,dbpth,sqlstr,apar) {

	// dbpth is the path to sqlite database ; sqlstr is the requisite SQLstring and apar is the array of parameters to be passed to sql command
	 try {
   dbh =  await opn_db(db,dbpth) ;
		 console.log('Param2',apar);
	 rv_row = await qry_all(dbh,sqlstr,apar) ;
		//rv_row = await jango()
//		console.log('Rv-row', rv_row);
	
	 console.log('closing',await clos_db(dbh));
	} catch(err) {
		console.log( err )
	}
	  return rv_row;

}; // end of functions

	 // function to open the  sqlitepath  , parameters  db object and dbpth as string , returns a promise for async await
const opn_db =function(db,dbpth) {
		 return new Promise( function( resolve , reject) {
			 console.log('Opening Database .. ',db,dbpth);
		 this.db = new sqlite3.Database(dbpth, (err)=>{
			 
		    if(err) reject('Open Error'+ err.message)
			 else resolve( this.db )
		 })
		 })
	 }


const clos_db =  function(db) {
    return new Promise(function(resolve, reject) {
				this.db.close((err)=>{
					if(err){
					  console.log('Closing Error');
						reject(err)}else{ resolve(true)}
				})
		
       // resolve(true)
    }) 
};
 // function to query db database using query and parameters, returns a promise for async await

function qry_all(db,query, body) {
		 return new Promise((resolve, reject)=> {
			 //resolve({name:"Varnil"});
			 
			// if(body == undefined) body=[]
			 console.log('In qry_all Param3',body);
			 console.log('db ',db,'Query : ',query, ' Params ',body);
			 debugger;
		 	 db.all(query, body, (err, rows)=>{
				 //console.log(rows);
					 if(err) reject("Read error: " + err.message)
					 else resolve(rows);
			 	})  
    			}) 
	};

function jango() {
	return new Promise((resolve,reject)=> {
		resolve({name:"Zarnil"});
	})
}


*/


// end of the file