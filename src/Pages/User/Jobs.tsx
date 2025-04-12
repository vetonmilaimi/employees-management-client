import withUser from "../../utils/enhancers/withUser";

const Jobs = () => {
  return (
    <div>UserJobs</div>
  )
}

const UserJobs = withUser(Jobs);
export default UserJobs