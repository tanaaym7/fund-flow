
import UserBalance from "../components/UserBalance";
import UserList from "../components/UserList";
import ProfileCircle from "../components/ProfileCircle";

const Dashboard = () => {
 
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Payments App</h1>
        <div className="flex items-center gap-5">
          <h2 className="text-xl font-semibold">Hello, </h2>
          <ProfileCircle />
        </div>
      </div>
      <hr className="opacity-30 my-5"></hr>
      <UserBalance />
      <UserList />
     
    </div>
  );
};

export default Dashboard;
