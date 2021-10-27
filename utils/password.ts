import bcrypt from "bcryptjs";

// promisified bcrypt
export function hashPassword(password: string): Promise<any> {
  return new Promise((resolve, reject) => {
    // Hash password using bcrypt
    bcrypt.genSalt(10, (err: any, salt: any) => {
      bcrypt.hash(password, salt, (err: any, hash: string) => {
        if (err) return reject(err);
        resolve(hash);
      });
    });
  });
}

export async function doesPasswordMatch(password: string, hashInDb: string) {
  return await bcrypt.compare(password, hashInDb);
}
