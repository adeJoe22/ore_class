import bcrypt from "bcryptjs";

export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

export const GenerateHash = async (data: string, salt: string) => {
  return await bcrypt.hash(data, salt);
};

export const ValidateData = async (
  enteredData: string,
  savedData: string,
  salt: string,
) => {
  return (await GenerateHash(enteredData, salt)) === savedData;
};
