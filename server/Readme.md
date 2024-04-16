
### connection URI
**mongodb://localhost:27018,localhost:27019,localhost:27020/test?replicaSet=berg**

**for replSet, in windows use below command as admin**
````ps1
start mongod -replSet berg -logpath \data\db1\1.log --dbpath \data\db1 --port 27018
````
