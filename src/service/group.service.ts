import API from "../plugins/api";
class GroupService {
    addGroup(group: any) {
    return API.post(`/group/create`, group);
  }
  getGroupBoxesByBuild(id: number){
    return API.get(`/group/${id}`);
  }
  
  updateGroupById(id: number, data: any) {
    return API.put(`/group/update/${id}`, data);
  }

  updateGroupTitleById(id:number,data:any){
    return API.put(`/group/updateTitle/${id}`, data);
  }
  deleteGroupById(id: any) {
    return API.delete(`/group/deleteGroups/${id}`);
  }
}
export default new GroupService();
