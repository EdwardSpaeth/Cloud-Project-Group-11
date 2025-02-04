export const validateAdminCredentials = (username, password) => {
    const hardcodedUsername = 'admin';
    const hardcodedPassword = 'admin';
  
    return username === hardcodedUsername && password === hardcodedPassword;
  };