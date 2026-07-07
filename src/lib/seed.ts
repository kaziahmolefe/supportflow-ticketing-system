import bcrypt from "bcryptjs";

export async function createSupportAgent(){

return{

name:"Kaziah",

email:"support@gss.local",

password:
await bcrypt.hash(
"Support123!",
10
),

role:"Support Agent",

theme:"light"

}

}