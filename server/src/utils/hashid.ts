import Hashids from "hashids"

const hashids = new Hashids(process.env.HASHIDS_SECRET,15)

export default hashids