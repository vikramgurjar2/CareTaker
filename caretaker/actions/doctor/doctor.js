import axios from "axios";

const base_url = "http://localhost:4000";

export async function getDoctors(doctor) {
  try {
    const { data } = await axios.get(`${base_url}/api/v1/doctor`);
    return {
      result: data.success,
      doctors: data.doctors,
      message: "Doctors load successfully",
    };
  } catch (error) {
    console.log(error);
  }
}
