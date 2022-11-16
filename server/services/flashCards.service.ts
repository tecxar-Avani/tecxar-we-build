
import { IFlashCards } from "@/interfaces/flashCards.interface";
import DB from "@databases";

class FlashCardService {
  private flashCard = DB.flashCards;

  public async getFlashCard(userId: number): Promise<IFlashCards[] | null> {
    const flashCards: IFlashCards[] | null = await this.flashCard.findAll({
      where: { created_by: userId },
      raw: true
    });
    if (!flashCards) {
      return null;
    } else {
      return flashCards;
    }
  }

  public async getFlashCardBuildId(buildId: number): Promise<IFlashCards[] | null> {
    const flashCardsBuildId: IFlashCards[] | null = await this.flashCard.findAll({
      where: { build_id: buildId },
      raw: true
    });
    if (!flashCardsBuildId) {
      return null;
    } else {
      return flashCardsBuildId;
    }
  }

  public async deleteFlashCardById(id: number): Promise<IFlashCards | null> {
    const flashCardByDelete: any | null = await this.flashCard.destroy({
      where: { id: id },
    });
    if (!flashCardByDelete) {
      return null;
    } else {
      return flashCardByDelete;
    }
  }

  public async updateFlashCardId(id: number, data): Promise<IFlashCards | null> {
    const flashCardByUpdate: any | null = await this.flashCard.update({ ...data },
      { where: { id: id } }
    );
    if (!flashCardByUpdate) {
      return null;
    } else {
      return flashCardByUpdate;
    }
  }
}
export default FlashCardService;
