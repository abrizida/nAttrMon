nattrmon.addInput(
   {
	"name":	"Filesystem check",
	"timeInterval": 60000,
	"waitForFinish": true,
	"onlyOnEvent": true
   },
   new nInput_FilesystemCount("Filesystem/Records", [
  	{"name": "Received", "folder": "/opt/wedo/data/loading/received", "pattern": ".*" },
  	{"name": "Input", "folder": "/opt/wedo/data/loading/in", "pattern": ".*\.dat" },
  	{"name": "Done", "folder": "/opt/wedo/data/loading/done", "pattern": ".*\.dat" },
  	{"name": "Error", "folder": "/opt/wedo/data/loading/err", "pattern": ".*\.dat" }
   ])
);
