import * as CallPath from '../utils/httpRequest';

const uploadVideo = async (des, file, thumbnail_time = 0, music = '', view_mode = '', data, token) => {
  try {
    // console.log('des: ', des);
    // console.log('file: ', file);
    // console.log('thumbnail_time: ', thumbnail_time);
    // console.log('music: ', music);
    // console.log('view_mode: ', view_mode);
    console.log('data: ', data);
    // console.log('token: ', token);
    // console.log('test: ', {
    //   description: des,
    //   upload_file: file,
    //   thumbnail_time,
    //   music,
    //   viewable: view_mode,
    // });

    const response = await CallPath.post(
      '/videos',
      {
        description: des,
        upload_file: file,
        thumbnail_time: thumbnail_time,
        music: music,
        viewable: view_mode,
      },
      {
        params: {},
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (err) {
    return { errCode: err.response.status };
  }
};

export default uploadVideo;
