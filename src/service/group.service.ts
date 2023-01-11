import API from "../plugins/api";
class GroupService {
    addGroup(group: any) {
    return API.post(`/group/create`, group);
  }
  getGroupBoxesByBuild(id: number){
    return API.get(`/group/${id}`);
  }
  
}
export default new GroupService();
