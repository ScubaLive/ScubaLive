package scubaLive;

public class Plan {

	private int numdives;
	private DiveTable divet;
	private SurfaceTable surfacet;
	private Dive dive1;
	private Dive dive2;
	private Dive dive3;
	SurfaceInterval si1;
	SurfaceInterval si2;
	private boolean safe;
	//int altitude;
	
	
	public Plan(DiveTable dtable, SurfaceTable stable) {
		divet = dtable;
		surfacet = stable;
		dive1 = new Dive(divet, surfacet);
		numdives = 1;
		dive2 = null;
		dive3 = null;
		si1 = null;
		si2 = null;
		safe = true;
	}
	
	public void updateNum(int divenumber) {
		int diff = 0;
		
		if (divenumber > 0 && divenumber < 4) {
			diff = divenumber - numdives;
			
			//increasing number of dives
			if (diff > 0) {
				while (diff > 0) {
					numdives++;
					if (numdives == 2) {
						if (dive2 == null) {
							dive2 = new Dive(divet, surfacet);
							si1 = new SurfaceInterval(dive1, dive2, surfacet);
						}
					}
					if (numdives == 3) {
						if (dive3 == null) {
							dive3 = new Dive(divet, surfacet);
							si2 = new SurfaceInterval(dive2, dive3, surfacet);
						}
						
					}
					
					diff--;
				}
				
			}
			
			//decreasing number of dives
			if (diff < 0) {
				numdives = divenumber;
				this.updateSafe();
			}
				
		} else {
			throw new IllegalArgumentException("Invalid number of dives");
		}
		
	}
	
	public void updateDive(int diveid, int time, int depth, char spg) {
		Dive dive = null;
		SurfaceInterval si = null;
		
		if (diveid > 0 && diveid < 4) {
			if (diveid == 1) {
				dive = dive1;
				if (numdives > 1) si = si1;
			}
			if (diveid == 2) {
				dive = dive2;
				if (numdives == 3) si = si2;
			}
			if (diveid == 3) dive = dive3;	
			dive.updateDive(time, depth, spg);
			si.updateInterval();
			
			this.updateSafe();
			
		} else { 
			throw new IllegalArgumentException("Invalid diveid");
		}
		
	}
	
	public void updateSI(int siid, int time) {
		SurfaceInterval si = null;
		
		if(siid == 1 || siid == 2) {
			if (siid == 1) si = si1;
			if (siid == 2) si = si2;
			si.updateInterval(time);
			
		} else {
			throw new IllegalArgumentException("Invalid siid");
		}
	}
	
	public void updateSafe() {
		boolean safety = true;
		
		if (numdives == 1) {
			safety = dive1.isSafe();
		}
		
		if (numdives == 2) {
			safety = dive1.isSafe() & dive2.isSafe();
		}
		
		if (numdives == 3) {
			safety = dive1.isSafe() & dive2.isSafe();
		}
		
		safe = safety;
		
	}
	

}
