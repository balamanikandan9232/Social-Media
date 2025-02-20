import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userid = req.params.userid;
  const q = "SELECT * FROM user WHERE id = ?";
//   console.log(userid);
  db.query(q, [userid], (err, data) => {
    if (err) return res.status(500).json(err);
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");
  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "UPDATE user SET `name`=?, `city`=?, `website`=?, `profilePic`=?, `coverPic`=?  WHERE id=? ";
    db.query(
      q,
      [
        req.body.name,
        req.body.city,
        req.body.website,
        req.body.coverPic,
        req.body.profilePic,
        userInfo.id,
      ],
      (err, data) => {
        if (err) res.status(500).json(err);
        if (data.affectedRows > 0) return res.json("Updated!");
        return res.status(403).json("You can update only your post!");
      }
    );
  });
};

// import express from "express";
// import { getUser } from "../controllers/user.js";

// const router = express.Router();

// router.get("/find/:userid", getUser)
// export default router;

// const Profile = () => {
//     const queryClient = useQueryClient();
//     const userid = useLocation().pathname.split("/")[2];
//     console.log(userid);
//     const { isLoading, error, data } = useQuery({
//       queryKey: ["user",userid],
//       queryFn: () =>
//         makeRequest.get("/user/find/" + userid).then((res) => {
//           return res.data;
//         }),
//     });

//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error.message}</div>;
//     console.log("data:", data);
// }
