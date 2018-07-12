/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service;

import com.lb.lbstore.domain.KuCun;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Administrator
 */
public interface KuCunService {

    public KuCun getKuCunById(Integer id);
    
    public List<KuCun> getKuCunTop100(KuCun kuCun);
    
    public boolean updateKuCun(KuCun kuCun);
    
    public boolean deleteKuCun(Integer id);
    
    public int queryRows(HashMap map);
    
    public List<KuCun> queryKuCunsByPage(HashMap map);

}
