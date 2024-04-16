/* eslint-disable react/prop-types */
const ProfileCircle = ({initial}) => {
  return (
    <div className="bg-violet-600 rounded-full w-10 h-10 flex justify-center items-center text-white font-bold uppercase">
      {initial}
    </div>
  );
};

export default ProfileCircle;
