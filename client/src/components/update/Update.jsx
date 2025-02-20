import { useState } from "react";
import "./update.scss";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    name: "",
    city: "",
    website: "",
  });
  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (user) => {
      return makeRequest.put("/user", user);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  console.log(user);
  const handleClick = async (e) => {
    e.preventDefault();
    let coverUrl;
    let profileUrl;
    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;
    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
    setOpenUpdate(false);
  };

  return (
    <div className="update">
      <h1>Update</h1>
      <form>
        <h3>
          ProfilePic:
          <input type="file" onChange={(e) => setCover(e.target.files[0])} />
        </h3>
        <h3>
          CoverPic:
          <input type="file" onChange={(e) => setProfile(e.target.files[0])} />
        </h3>
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="city"
          onChange={handleChange}
        />
        <input
          type="text"
          name="website"
          placeholder="website"
          onChange={handleChange}
        />
        <button className="up-btn" onClick={handleClick}>
          Update
        </button>
      </form>
      <button className="btn-close" onClick={() => setOpenUpdate(false)}>
        X
      </button>
    </div>
  );
};

export default Update;
