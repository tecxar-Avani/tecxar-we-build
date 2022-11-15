
import {IFlashCards } from "@/interfaces/flashCards.interface";
import DB from "@databases";

class FlashCardBuildIdService {
  private flashCardBuildId = DB.flashCards;

  public async getFlashCardBuildId(buildId:number): Promise<IFlashCards[] | null> {
    const flashCardsBuildId: IFlashCards[] | null = await this.flashCardBuildId.findAll({
          where:{build_id:buildId},
       raw:true
    });
    if (!flashCardsBuildId) {
      return null;
    } else {
      return flashCardsBuildId;
    }
  }
}
export default FlashCardBuildIdService;
