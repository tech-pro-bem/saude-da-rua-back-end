/* eslint-disable prettier/prettier */
import { IUpdateVolunteerRepository } from '../../repositories/interfaces'
import TUpdateVolunteerRequestDTO from './UpdateVolunteerRequestDTO'

class UpdateVolunteerUseCase {

    private updateVolunteerRepository: IUpdateVolunteerRepository

    constructor(UpdateVolunteerRepository: IUpdateVolunteerRepository){    
        this.updateVolunteerRepository = UpdateVolunteerRepository
    }

    async execute(updatingVolunteer: TUpdateVolunteerRequestDTO){
    
      const { partialVolunteer } = updatingVolunteer

      await this.updateVolunteerRepository.updateVolunteer(partialVolunteer)

    }
}

export default UpdateVolunteerUseCase
