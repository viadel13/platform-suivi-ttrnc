import { useState } from "react"
import bcrypt from 'bcryptjs'

const Hash = () => {
  const [pass, setPass] = useState('');
  const [passHash, setPassHash] = useState('');

  async function hash() {
    const hashedPassword = await bcrypt.hash(pass, 5);
    setPassHash(hashedPassword);
  }

  return (
    <div>
      <input type="text" value={pass} onChange={(e) => setPass(e.target.value)} />
      <br /><br />
      <button onClick={hash}>Generer pass</button><br /> <br />

      <input type="text" value={passHash} readOnly />

    </div>
  )
}

export default Hash
