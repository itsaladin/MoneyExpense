const getLatestVersion = async () => {
  try {
    const res = await fetch('https://test.service.com/apis');
    const { version } = await res.json();
    return version;
  } catch (error) {
    console.log(error);
    return '2.0.0';
  }
};

export default getLatestVersion;
