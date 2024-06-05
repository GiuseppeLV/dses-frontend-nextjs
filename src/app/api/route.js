
export async function GET(request) { 
    console.log("RES:", process.env.MNEMONIC_PHRASE)
    return Response.json(process.env.MNEMONIC_PHRASE)
  }

